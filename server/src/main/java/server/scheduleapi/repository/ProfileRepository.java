package server.scheduleapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.scheduleapi.model.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
}
