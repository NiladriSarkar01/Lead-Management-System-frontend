import React, {useState} from 'react'
import { useLeadStore } from '../store/useLeadStore';
import ConfirmDialog from './ConfirmDialog';

const DetailsPanel = ({ onEditClick}) => {

    const {deleteLead, setSelectedLead, selectedLead } = useLeadStore();
    
  const [showDialog, setShowDialog] = useState(false);

  const onDeleteClick = ()=>{
    setShowDialog(true);
  }
  const Delete = () =>{
        deleteLead(selectedLead._id);
        setSelectedLead(null);
        setShowDialog(false)
  }

  return (
    <div className="w-1/3 bg-white shadow-xl p-6"
        style={{ height: "75vh"}}
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Lead Details</h2>
          {selectedLead ? (
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedLead.first_name} {selectedLead.last_name}</p>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Phone:</strong> {selectedLead.phone}</p>
              <p><strong>Company:</strong> {selectedLead.company}</p>
              <p><strong>City:</strong> {selectedLead.city}</p>
              <p><strong>State:</strong> {selectedLead.state}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Source:</strong> {selectedLead.source}</p>
              <p><strong>Score:</strong> {selectedLead.score}</p>
              <p><strong>Lead Value:</strong> {selectedLead.lead_value}</p>
              <p><strong>Is Qualified:</strong> {selectedLead.is_qualified?"Yes":"No"}</p>
              <p><strong>Created At:</strong> {selectedLead.createdAt}</p>
              <p><strong>Last Activity At:</strong> {selectedLead.last_activity_at}</p>
              <p><strong>Lead Value:</strong> ${selectedLead.lead_value}</p>
            </div>
          ) : (
            <p className="text-gray-500">Click on a row to see details.</p>
          )}

          {selectedLead ? (
            <div className="flex justify-between mt-4 pt-4 border-t">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={onEditClick}
            >
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={onDeleteClick}
            >
              Delete
            </button>
          </div>
          ):(null)}

            {showDialog && (
                <ConfirmDialog
                message="Are you sure?"
                onConfirm={(value) => {
                value ? Delete():setShowDialog(false)
            }}
        />
      )}

        </div>
  )
}

export default DetailsPanel
