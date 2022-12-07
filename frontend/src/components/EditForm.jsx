import React from 'react'
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const updateDepartment = loader('./departmentMutation.gql');
const getDepartment = loader('./departmentQuery.gql');

function EditForm({name,milestone,status,_id}) {
    const [name, setName] = useState(name);
    const [milestone, setMilestone] = useState(milestone);
    const [status, setStatus] = useState(() => {
    switch (status) {
        case "Not Started": return "NEW";
        case "In Progress": return "INPROGRESS";
        case "Completed": return "COMPLETE";
        default: throw new Error(`Unknown status: ${status}`);
        }
    });

    const [onClickHandler] = useMutation(updateDepartment, {
        variables: { 
            id: _id, 
            name:name, 
            lastmilestone:milestone, 
            status:status 
        },
        refetchQueries: [{ 
            query: getDepartment, 
            variables: { 
                id: _id 
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
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
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