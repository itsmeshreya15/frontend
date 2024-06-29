const contractAddress = '0xD5B4bD66FE3F17F10eFBb575818EdB947cA83861';
const contractABI = [
    // Contract ABI
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_marks",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_passed",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "_course",
                "type": "string"
            }
        ],
        "name": "addStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getStudentName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getStudentMarks",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isStudentPassed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getStudentCourse",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        document.getElementById('addStudent').addEventListener('click', async () => {
            const address = document.getElementById('address').value;
            const name = document.getElementById('name').value;
            const marks = document.getElementById('marks').value;
            const passed = document.getElementById('passed').checked;
            const course = document.getElementById('course').value;
            
            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];
                
                await contract.methods.addStudent(address, name, marks, passed, course).send({ from: account });
                alert('Student added successfully');
            } catch (error) {
                console.error(error);
                alert('Error adding student');
            }
        });

        document.getElementById('getStudentInfo').addEventListener('click', async () => {
            const queryAddress = document.getElementById('queryAddress').value;
            try {
                const name = await contract.methods.getStudentName(queryAddress).call();
                const marks = await contract.methods.getStudentMarks(queryAddress).call();
                const passed = await contract.methods.isStudentPassed(queryAddress).call();
                const course = await contract.methods.getStudentCourse(queryAddress).call();

                const studentInfo = `
                    <p>Name: ${name}</p>
                    <p>Marks: ${marks}</p>
                    <p>Passed: ${passed}</p>
                    <p>Course: ${course}</p>
                `;
                document.getElementById('studentInfo').innerHTML = studentInfo;
            } catch (error) {
                console.error(error);
                alert('Error fetching student info');
            }
        });
    } else {
        alert('Please install MetaMask!');
    }
});
