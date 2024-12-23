import React from 'react'
import AdminModal from './components/AdminModal'
import EditEmployee from 'pages/EditEmployee'

function EditEmployeeModal({ onClose }) {
   return (
      <AdminModal
         title="Edit Employee"
         onClose={onClose}
      >
         <EditEmployee />
      </AdminModal>
   )
}

export default EditEmployeeModal