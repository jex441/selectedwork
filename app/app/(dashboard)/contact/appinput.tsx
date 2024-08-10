import React from 'react'
import { Input } from '@/components/ui/input';

export default function AppInput({id, placeholder, text, name, error, type = "text"} : {id: string, placeholder: string; text: string | null, name: string, error: string[] | string, type: string}) {
  return (
    <Input type={type} id={id} placeholder={placeholder} defaultValue={text ?? ""} name={name} className={error && "border-red-500"}/>
  )
}
