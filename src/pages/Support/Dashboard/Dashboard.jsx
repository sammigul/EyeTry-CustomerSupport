import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Table from '../../../components/ui/Table'
export default function Dashboard() {
  return (
    <>
      <div className="w-[90%] md:w-[80%] flex flex-col justify-center mx-auto mb-10">
        <h1 className="text-3xl font-semibold font-sans py-10">Tickets Management</h1>
        <Table />
      </div>

    </>
  )
}

