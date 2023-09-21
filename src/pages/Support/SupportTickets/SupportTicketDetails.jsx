import React from "react";
import { Link } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SupportTicketDetails() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchAttribute, setSearchAttribute] = React.useState('name');
    const handleAttributeChange = (event) => {
        setSearchAttribute(event.target.value);
    };
    return (
        <div className="flex flex-col h-screen">
            <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto ">

                <div className=" bg-white border border-gray-200 rounded-lg shadow  mt-10  mx-auto mb-10">
                    <div className="flex flex-row mt-3">
                        <h4 class="ml-5  text-xl font-semibold tracking-tight text-gray-900 font-sans">Support Ticket Details</h4>
                    </div>
                    <hr class="border-3 border-gray-300 my-4" />
                    <div className="p-5 text-base">

                        <table class="table-auto mx-auto p-4">
                            <tr>
                                <th class="p-2 text-left">Customer Name</th>
                                <td class="p-2">Abdul Sammi Gul</td>
                            </tr>
                            <tr>
                                <th class="p-2 text-left">Ticket Type</th>
                                <td class="p-2">Product Return</td>
                            </tr>
                            <tr>
                                <th class="p-2 text-left">Ticket Priority</th>
                                <td class="p-2">Low</td>
                            </tr>
                            <tr>
                                <th class="p-2 text-left">Issue Description</th>
                                <td class="p-2">Want to return the product</td>
                            </tr>
                            <tr>
                                <th class="p-2 text-left">Order Number</th>
                                <td class="p-2">203</td>
                            </tr>
                            <tr>
                                <th class="p-2 text-left">Status</th>
                                <td class="p-2">

                                    <Select
                                        value={searchAttribute}
                                        onChange={handleAttributeChange}
                                        sx={{
                                            height: '32px',
                                        }}
                                    >
                                        <MenuItem value="name">In Progress</MenuItem>
                                        <MenuItem value="dateIssued">Solved</MenuItem>
                                        <MenuItem value="ticketType">Pending</MenuItem>
                                    </Select>

                                </td>
                            </tr>
                        </table>

                        <div className="w-[60%] mx-auto">
                            <textarea className="block w-full p-2 pr-3 borderblock px-4 py-2.5 mt-2  bg-white rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out border-2" placeholder="Enter Detailed Description" id="w3review" name="w3review" rows="4" cols="50"></textarea>
                            <button className=" mt-2 ml-auto py-1 px-4 rounded inline-flex items-center
                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                              hover:text-white border border-blue-500 hover:border-transparent align-right"><span>Send</span></button>
                        </div>
                    </div>
                </div>

                <div className="md:ml-auto md:text-right text-center mb-10">
                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                             focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700
                              dark:focus:ring-red-900">Live Chat</button>
                    <Link >
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                          dark:focus:ring-gray-700 dark:border-gray-700">Mark as Resolved</button></Link>
                </div>
            </div>
        </div>
    );
}

