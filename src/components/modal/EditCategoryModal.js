import React from 'react'

import EditCategory from 'pages/EditCategory'
import AdminModal from './components/AdminModal'

function EditCategoryModal({ onClose, data }) {
   return (
      <AdminModal
         title="Edit Category"
         onClose={onClose}
      >
         <EditCategory data={data} />
      </AdminModal>
   )
}

export default EditCategoryModal