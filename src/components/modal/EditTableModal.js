import React from 'react'
import EditTable from 'pages/EditTable'
import AdminModal from './components/AdminModal'

function EditTableModal({ onClose }) {
   return (
      <AdminModal
         title="Edit Table"
         onClose={onClose}
      >
         <EditTable />
      </AdminModal>
   )
}

export default EditTableModal