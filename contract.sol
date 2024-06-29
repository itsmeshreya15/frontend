pragma solidity >=0.6.12 <0.9.0;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract StudentGradeSystem {
    struct Student {
        string name;
        uint marks;
        bool passed;
        string course;
    }

    mapping(address => Student) public students;

    function addStudent(address _address, string memory _name, uint _marks, bool _passed, string memory _course) public {
        students[_address] = Student(_name, _marks, _passed, _course);
    }

    function getStudentName(address _address) public view returns (string memory) {
        return students[_address].name;
    }

    function getStudentMarks(address _address) public view returns (uint) {
        return students[_address].marks;
    }

    function isStudentPassed(address _address) public view returns (bool) {
        return students[_address].passed;
    }

    function getStudentCourse(address _address) public view returns (string memory) {
        return students[_address].course;
    }
}

