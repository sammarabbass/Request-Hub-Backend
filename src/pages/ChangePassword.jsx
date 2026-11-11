import React, { useState } from 'react'
import { changePassword } from '../api/auth'

const ChangePassword = () => {

    const [form, setForm] = useState({
        oldPassword:"",
        newPassword:"",
    })

    const submit = async(e)=>{
        e.preventDefault()
        try{
            const res = await changePassword(form)
            console.log(res);
            
            alert(res.data.message)
        }catch(err){
            alert(err.response?.data?.message)

        }
    }
  return (
    <div>
        <form onSubmit={submit}>
            <h2>Change Password</h2>
            <input type="password"
                placeholder='Old Password'
                onChange={(e)=> setForm({...form, oldPassword:e.target.value})}
                />
            <input type="password"
                placeholder='new password'
                onChange={(e)=> setForm({...form, newPassword:e.target.value})}
                />
                <button>Update Password</button>
        </form>
      
    </div>
  )
}

export default ChangePassword
