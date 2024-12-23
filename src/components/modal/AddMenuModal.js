import React from 'react'
import AddMenu from '../../pages/AddMenu'
import AdminModal from './components/AdminModal'

function AddMenuModal({ onClose }) {
   return (
      <AdminModal
         title="Add Menu"
         onClose={onClose}
      >
         <AddMenu />
      </AdminModal>
   )
}

export default AddMenuModal