import React from 'react'
import AddEmployee from '../../pages/AddEmployee'
import AdminModal from './components/AdminModal'

function AddMenuModal({ onClose }) {
   return (
      <AdminModal
         title="Add Employee"
         onClose={onClose}
      >
         <AddEmployee />
      </AdminModal>
   )
}

export default AddMenuModal;