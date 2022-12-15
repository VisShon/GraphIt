import React,{useState} from 'react'
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const UpdateDepartment = loader('../apollo/Department/updateDepartment.gql');
const GetDepartment = loader('../apollo/Department/getDepartment.gql');

function EditForm({department}) {
    const [name, setName] = useState(department.name);
    const [milestone, setMilestone] = useState(department.lastMilestone);
    const [status, setStatus] = useState(department.status);

    const [onClickHandler] = useMutation(UpdateDepartment, {
        variables: { 
            id: department._id, 
            name:name, 
            lastMilestone:milestone, 
            status:status 
        },
        refetchQueries: [{ 
            query: GetDepartment, 
            variables: { 
                id: department._id 
            } 
        }],
    });

    const onSubmit = (e) => {
        if (!name || !milestone || !status) {
          return alert("Please fill out all fields");
        }
        onClickHandler(name, milestone, status);
    };

    return (
        <div className="mt-5">
            <h3>Update Department Details</h3>
            <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Last Milestone</label>
                <textarea
                className="form-control"
                id="milestone"
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                <option value="NEW">Not Started</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </form>
        </div>
    )
}

export default EditForm