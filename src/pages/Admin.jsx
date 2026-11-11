
import React, { useEffect } from 'react'
import { getAdmin } from '../api/auth'
import { authHeader } from '../api/axios'
import AdminDashboard from './AdminDashboard'

const Admin = () => {
    useEffect(() => {
      const load = async () => {
        try {
          const res = await getAdmin(authHeader())
          console.log(res.data)
        } catch {
          alert("Not Authorized")
        }
      }

      load()
    }, [])
  return (
    <div>
      <AdminDashboard/>
    </div>
  )
}

export default Admin
