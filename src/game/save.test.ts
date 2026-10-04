import assert from "node:assert/strict";
import { test } from "node:test";
import { defaultSave, parseSave, loadSave, persistSave, clearSave, hasSaveFile, SAVE_KEY } from "./save";
function memory(){const data=new Map<string,string>();Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)}});return data;}
test("versioned export roundtrip preserves cars, economy and settings",()=>{const s=defaultSave();s.money=500;s.cars.ember.owned=true;s.selectedCar="ember";s.settings.master=0;assert.deepEqual(parseSave(JSON.stringify(s)),s);});
test("malformed and future files are rejected before importing",()=>{for(const s of ['null','[]','{}','{"version":99}','{"version":"1"}'])assert.throws(()=>parseSave(s));});
test("null primary recovers backup and missing primary still offers continue",()=>{const d=memory();const s=defaultSave();s.money=999;d.set(SAVE_KEY+":bak",JSON.stringify(s));d.set(SAVE_KEY,"null");assert.equal(loadSave().money,999);d.delete(SAVE_KEY);assert.equal(hasSaveFile(),true);assert.equal(loadSave().money,999);});
test("reset removes both generations and save writes roundtrip",()=>{memory();const s=defaultSave();persistSave(s);persistSave({...s,money:3000});assert.equal(loadSave().money,3000);clearSave();assert.equal(hasSaveFile(),false);assert.equal(loadSave().money,2200);});
