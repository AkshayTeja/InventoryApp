"use client"

import Image from "next/image"
import React,{useState,useEffect} from "react"
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore" 
import { db } from "../lib/firebase.js";


export default function Home(){
  const [items,setItems] = useState([
  ]);
  const [newItem,setNewItem]=useState({name: "",price: ""})
  const [total,setTotal]=useState(0)

//Add item to database
const addItem = async (e) => {
  e.preventDefault();
  if (newItem.name !== " " && newItem.price !== " "){
    //setItems([...items,newItem]);
    await addDoc(collection(db,"items"),{
      name: newItem.name.trim(),
      price: newItem.price,
    });
    setNewItem({name: "",price: ""});
  }
};

//Read items from database
useEffect(() => {
  const q=query(collection(db,"items"))
  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    let itemsArr = []

    querySnapshot.forEach((doc) => {
      itemsArr.push({...doc.data(),id: doc.id})
    });
    setItems(itemsArr);

    //Read total from itemsArr
    const calculateTotal = () => {
      const totalPrice = itemsArr.reduce((sum,item) => sum+parseFloat(item.price),0)
      setTotal(totalPrice)
    }
    calculateTotal()
    return () => unsubscribe();
  });
},[]);

//Delete items from database
const deleteItem = async (id) => {
  await deleteDoc(doc(db,"items",id));
}

  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center text-white">Inventory Manager</h1>
        <h2 className="text-2xl p-4 pb-8 text-center text-white">This is an inventory management website that helps you track what you have along with their prices</h2>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black"> 
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem,name: e.target.value})}
            className="col-span-3 p-3 border" type="text" placeholder="Enter Item"/>
            <input value={newItem.price} onChange={(e) => setNewItem({...newItem,price: e.target.value})}
            className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter Price"/>
            <button onClick={addItem}
            className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">+</button>
          </form>
          <ul>
            {items.map((item,id) => 
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="text-white capitalize">{item.name}</span>
                  <span className="text-white">${item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} 
                className="text-white ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
              </li>
            )}
          </ul>
          {items.length < 1 ? ("") : (
            <div className="flex justify-between p-3">
              <span className="text-white">Total</span>
              <span className="text-white">${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
  