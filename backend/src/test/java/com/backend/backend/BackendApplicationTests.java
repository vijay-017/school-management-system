package com.backend.backend;

import com.backend.backend.entity.Student;
import com.backend.backend.entity.Teacher;
import com.backend.backend.entity.User;
import com.backend.backend.entity.Role;
import com.backend.backend.services.StudentService;
import com.backend.backend.services.TeacherService;
import com.backend.backend.repository.StudentRepository;
import com.backend.backend.repository.TeacherRepository;
import com.backend.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private StudentService studentService;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private TeacherRepository teacherRepository;

	@Autowired
	private UserRepository userRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void testDeleteStudent() {
		// Clean up from previous runs
		studentRepository.findByRollNumber("ROLL123").ifPresent(student -> {
			studentRepository.delete(student);
		});

		// Students no longer have a linked User account (no phones on campus,
		// only Parents log in). Build the student without any User reference.
		Student student = Student.builder()
				.rollNumber("ROLL123")
				.firstName("Test")
				.lastName("Student")
				.admissionDate(LocalDate.now())
				.build();
		studentRepository.save(student);

		assertNotNull(studentRepository.findByRollNumber("ROLL123").orElse(null));

		try {
			studentService.deleteStudent("ROLL123");
			System.out.println("--- DELETION SUCCESSFUL ---");
		} catch (Exception e) {
			System.out.println("--- DELETION FAILED WITH EXCEPTION ---");
			e.printStackTrace();
			fail("Delete failed: " + e.getMessage());
		}

		// Verify student record is gone
		assertNull(studentRepository.findByRollNumber("ROLL123").orElse(null));
	}

	@Test
	void testDeleteTeacher() {
		// Clean up from previous runs
		teacherRepository.findByEmployeeId("EMP123").ifPresent(teacher -> {
			teacherRepository.delete(teacher);
		});
		userRepository.findByUsername("testteacher123").ifPresent(user -> {
			userRepository.delete(user);
		});

		User user = User.builder()
				.username("testteacher123")
				.password("password")
				.email("testteacher123@school.com")
				.role(Role.TEACHER)
				.build();
		user = userRepository.save(user);

		Teacher teacher = Teacher.builder()
				.employeeId("EMP123")
				.firstName("Test")
				.lastName("Teacher")
				.user(user)
				.hireDate(LocalDate.now())
				.build();
		teacherRepository.save(teacher);

		assertNotNull(teacherRepository.findByEmployeeId("EMP123").orElse(null));

		try {
			teacherService.deleteTeacher("EMP123");
			System.out.println("--- TEACHER DELETION SUCCESSFUL ---");
		} catch (Exception e) {
			System.out.println("--- TEACHER DELETION FAILED WITH EXCEPTION ---");
			e.printStackTrace();
			fail("Delete failed: " + e.getMessage());
		}

		// Verify deletion
		assertNull(teacherRepository.findByEmployeeId("EMP123").orElse(null));
		assertFalse(userRepository.findByUsername("testteacher123").isPresent());
	}
}
