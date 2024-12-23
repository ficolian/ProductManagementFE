import React from 'react'

import EditMenu from 'pages/EditMenu'
import AdminModal from './components/AdminModal'

function EditMenuModal({ onClose }) {
   return (
      <AdminModal
         title="Edit Menu"
         onClose={onClose}
      >
         <EditMenu />
      </AdminModal>
   )
}

export default EditMenuModal