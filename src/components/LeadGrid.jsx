import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useLeadStore } from "../store/useLeadStore";
import LeadFilter from "./LeadFilter.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import DetailsPanel from "./DetailsPanel.jsx";
import { toast } from "react-toastify";
    
    ModuleRegistry.registerModules([ AllCommunityModule ]);

export default function LeadGrid() {

  const navigate = useNavigate();

  const {logout} = useAuthStore();
  const { leads, getLeads, meta, setSelectedLead, selectedLead } = useLeadStore();

  const [colDefs] = useState([
    { headerName: "First Name", field: "first_name", sortable: true, filter: true, flex: 1 },
    { headerName: "Last Name", field: "last_name", sortable: true, filter: true, flex: 1 },
    { headerName: "Email", field: "email", sortable: true, filter: true, flex: 2 },
    { headerName: "Phone", field: "phone", sortable: true, filter: true, flex: 1 },
    { headerName: "Company", field: "company", sortable: true, filter: true, flex: 1 },
    { headerName: "Status", field: "status", sortable: true, filter: true, flex: 1 },
    { headerName: "Score", field: "score", sortable: true, filter: true, flex: 1 },
    { headerName: "Lead Value", field: "lead_value", sortable: true, filter: true, flex: 1 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({});


  const changePage = (value) => {
    setCurrentPage((prev) => {
      console.log(meta);
      
      let newPage = prev + value;
      if (newPage < 1) newPage = 1;
      if (newPage > meta.totalPages) newPage = meta.totalPages;
      setParams({ ...params, page: newPage });
      return newPage;
    });
    
  };
  
  
  const onSearchChange = (e) =>{
    setParams({...params, search:e.target.value});
  }

  const getHelper = async ()=>{
    const res = await getLeads(params);
    if(!res.success){
      toast.error(res.message)
    }
  }

  useEffect( () => {
    getHelper()
  }, [ getLeads, params ]);
  console.log(leads);
  
  const onRowClicked = useCallback((event) => {
    setSelectedLead(event.data);
  }, []);

  const onApply = (filters) =>{
    console.log(params);
    
    setParams({...params, ...filters});
    
  }

  const onEditClick = ()=>{
    navigate('/update-lead', {state:selectedLead});
  }

  return (
    <div className="h-screen w-full flex flex-col gap-2 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md p-2 ">
        <h1 className="text-2xl font-bold text-blue-700">Leads Dashboard</h1>
        <input
        onChange={onSearchChange}
          type="text"
          placeholder="Search leads..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button
          onClick={() => navigate('/create-lead')}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition"
        >
          Create New Lead
        </button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition" onClick={logout}>
          logout
        </button>
      </div>

      <LeadFilter onApply={onApply}/>

      {/* Main Content */}
      <div className="flex gap-6 p-6 pt-0 flex-1">
        {/* Table Section */}
        <div
          className="ag-theme-alpine  shadow-xl bg-white"
          style={{ height: "75vh", width: "80%" }}
        >
          <AgGridReact
            rowData={leads}
            columnDefs={colDefs}
            rowSelection={{mode:"singleRow"}}
            onRowClicked={onRowClicked}
          />
          <div className="flex justify-center items-center gap-6">
            <button className="w-12 h-12 flex text-2xl items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
            onClick={()=>changePage(-1)}
            >{"<"}</button>
            <h1 className="text-2xl">{currentPage}</h1>
            <button className="w-12 h-12 flex text-2xl items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
            onClick={()=>changePage(+1)}
            >{">"}</button>
          </div>
        </div>

        {/* Details Panel */}
        <DetailsPanel selectedLead={selectedLead} onEditClick={onEditClick} />
      </div>
    </div>
  );
}
