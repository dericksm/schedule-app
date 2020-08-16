package server.scheduleapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import server.scheduleapi.model.Profile;
import server.scheduleapi.repository.ProfileRepository;

@SpringBootApplication
public class ScheduleApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScheduleApiApplication.class, args);
	}

}
