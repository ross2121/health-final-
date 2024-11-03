"use server"
import { NextResponse } from 'next/server';
import {hospital} from '../../../components/atoms/cotrollers/hosptial';

export const POST=async(req:Request)=>{
  try {
    return await hospital(req);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Message not allowed',error}, { status: 405 });
  }
}
