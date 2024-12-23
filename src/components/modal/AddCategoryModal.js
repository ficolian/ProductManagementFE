import React from 'react'
import AddCategory from 'pages/AddCategory'
import AdminModal from './components/AdminModal'

function AddCategoryModal({ onClose }) {
   return (
      <AdminModal
         title="Add Category"
         onClose={onClose}
      >
         <AddCategory />
      </AdminModal>
   )
}

export default AddCategoryModal