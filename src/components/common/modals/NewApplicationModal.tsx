import React, { useState } from 'react'

import Modal from './Modal';

import { JobApplication } from '../../../types/applicationInfo';
interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newApplication: JobApplication) => { company: string, position: string, status: string, dateApplied: string };
}

enum JobStatus {
    Applied = "Applied",
    Interview = "Interview",
    Offer = "Offer",
    Rejected = "Rejected",
    PhoneScreen = "Phone Screen",
    FinalRound = "Final Round",
}

const NewApplicationModal: React.FC<NewApplicationModalProps> = ({ isOpen, onClose, onConfirm }) => {

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState(JobStatus.Applied);
    const [dateApplied, setDateApplied] = useState(new Date().toLocaleDateString());
    const [notes, setNotes] = useState("");

    // const handleAddNewJobEntry = (() => {
    //     // TODO: Logic to add a new job posting needs to be moved to Applications component
    //     // TODO: Logic also needs to update backend and fetch new data
    //     // For demonstration, we'll just add a new job application
    //     const newApplication: JobApplication = { 
    //         company: company,
    //         position: position,
    //         dateApplied: dateApplied,
    //         status: status
    //     };
    // })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch(name) {
            case 'company':
                setCompany(value);
                break;
            case 'position':
                setPosition(value);
                break;
            case 'dateApplied':
                setDateApplied(value);
                break;
            case 'notes':
                setNotes(value);
                break;
            case 'status':
                if (Object.values(JobStatus).includes(value as JobStatus)) {
                    setStatus(value as JobStatus);
                    return;
                }
                break;
            default:
                break;
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <section className="max-w-7xl mx-auto dark:bg-gray-800">
                <h1 className="text-xl font-bold  capitalize dark:">Add new job entry</h1>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className=" dark:text-gray-200" htmlFor="company-name-input">Company Name</label>
                            <input 
                                id="company-name-input" 
                                value={company}
                                onChange={handleInputChange}
                                type="text"
                                name="company" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                            />
                        </div>

                        <div>
                            <label className=" dark:text-gray-200" htmlFor="position">Position</label>
                            <input 
                                id="position"
                                value={position}
                                onChange={handleInputChange} 
                                type="text"
                                name="position" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                            />
                        </div>
                        <div>
                            <label className=" dark:text-gray-200" htmlFor="passwordConfirmation">Status</label>
                            <select 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                value={status}
                                onChange={handleInputChange}
                                name="status"
                            >
                                <option>Applied</option>
                                <option>Interview</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                                <option>Phone Screen</option>
                                <option>Final Round</option>
                            </select>
                        </div>
                        <div>
                            <label className=" dark:text-gray-200" htmlFor="dateApplied-datepicker">Date Applied</label>
                            <input 
                                id="dateApplied-datepicker"
                                value={dateApplied}
                                onChange={handleInputChange}
                                name="dateApplied" 
                                type="date" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                            />
                        </div>
                        <div>
                            <label className=" dark:text-gray-200" htmlFor="Notes">Notes</label>
                            <textarea 
                                value={notes}
                                onChange={handleInputChange}
                                name="notes"
                                id="Notes" 
                                typeof="textarea" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >

                            </textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">
                            Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 " stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span className="">Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1 ">or drag and drop</p>
                            </div>
                            <p className="text-xs ">
                                PNG, JPG, GIF up to 10MB
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={() => {
                                onConfirm({ company, position, status, dateApplied }); 
                                onClose();}}
                        >
                            Save New Application
                        </button>
                    </div>
                </form>
            </section>
        </Modal>
    )
}

export default NewApplicationModal