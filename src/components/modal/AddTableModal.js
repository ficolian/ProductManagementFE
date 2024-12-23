import React from 'react'
import AddMenu from '../../pages/AddTable'
import AdminModal from './components/AdminModal'

function AddTableModal({ onClose }) {
   return (
      <AdminModal
         title="Add Table"
         onClose={onClose}
      >
         <AddMenu />
      </AdminModal>
   )
}

export default AddTableModal