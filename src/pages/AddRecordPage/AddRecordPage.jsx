import React, { useState } from 'react';
import { createRecord } from '../../utilities/records-service';
import { addRecord } from '../../utilities/users-service';

export default function AddRecordPage({ user }) {
    const [stoolData, setStoolData] = useState({
        userId: user._id,
        duration: "",
        blood: "no",
        urgent: "no",
        pain: "no",
        type: "",
        size: "",
        color: "",
        notes: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoolData({ ...stoolData, [name]: value });
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!error) {
            //create stool record
			const data = await createRecord(stoolData);
			console.log(data);
            
            //add stool record to user's record array
            const saveNewUserRecord = await addRecord({
                userId: user._id,
                recordId: data._id,
              });

              console.log(user)
            
        
            
		}
	};

    return (
        <>
            <div>AddRecordPage</div>
            <form onSubmit={handleSubmit}>
                <label>Duration:</label>
                <br></br>
                <label>
                    <input type="radio" name="duration" value="1-3 mins" checked={stoolData.duration === '1-3 mins'} onChange={handleChange} />
                    1-3 mins
                </label>
                <label>
                    <input type="radio" name="duration" value="3-10 mins" checked={stoolData.duration === '3-10 mins'} onChange={handleChange} />
                    3-10 mins
                </label>
                <label>
                    <input type="radio" name="duration" value="10 mins+" checked={stoolData.duration === '10 mins+'} onChange={handleChange} />
                    10 mins+
                </label>
                <br />

                <label>Blood:</label>
                <select
                    name="blood"
                    value={stoolData.blood}
                    onChange={handleChange}
                    required
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <br />

                <label>Urgent:</label>
                <select
                    name="urgent"
                    value={stoolData.urgent}
                    onChange={handleChange}
                    required
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <br />

                <label>Pain:</label>
                <select
                    name="pain"
                    value={stoolData.pain}
                    onChange={handleChange}
                    required
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <br />

                <label>Type:</label>
                <select
                    name="type"
                    value={stoolData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                    <option value="3">Type 3</option>
                    <option value="4">Type 4</option>
                    <option value="5">Type 5</option>
                    <option value="6">Type 6</option>
                    <option value="7">Type 7</option>

                </select>
                <br />

                <label>Size:</label>
                <select
                    name="size"
                    value={stoolData.size}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <br />

                <label>Color:</label>
                <select
                    name="color"
                    value={stoolData.color}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select color</option>
                    <option value="Brown">Brown</option>
                    <option value="Yellow">Yellow</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                </select>
                <br />

                <label>Notes:</label>
                <textarea
                    name="notes"
                    value={stoolData.notes}
                    onChange={handleChange}
                />
                <br />
                <button type='submit'>Submit Record</button>
            </form>
        </>
    );
}
