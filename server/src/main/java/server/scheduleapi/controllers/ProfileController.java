package server.scheduleapi.controllers;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import server.scheduleapi.model.Profile;
import server.scheduleapi.repository.ProfileRepository;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin("*")
public class ProfileController {

    @Autowired
    private ProfileRepository repository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Profile save(@RequestBody Profile profile) {
        return repository.save(profile);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Page<Profile> getProfiles(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
     ) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return repository.findAll(pageRequest);
    }

    @PatchMapping("{id}/favorite")
    public void favorite(@PathVariable Integer id) {
        Optional<Profile> profile = repository.findById(id);
        if (profile.isPresent()) {
            profile.get().setFavorite(!profile.get().getFavorite());
            repository.save(profile.get());
        }
    }

    @PutMapping("{id}/photo")
    public byte[] addPhoto(@PathVariable Integer id, @RequestParam("photo") Part file) {
        Optional<Profile> profile = repository.findById(id);
        if (profile.isPresent()) {
            profile.get().setFavorite(!profile.get().getFavorite());
            try {
                InputStream is = file.getInputStream();
                byte[] bytes = new byte[(int) file.getSize()];
                IOUtils.readFully(is, bytes);
                profile.get().setPhoto(bytes);
                repository.save(profile.get());
                is.close();
                return bytes;
            } catch (IOException ex) {
                return null;
            }
        }
        return null;
    }
}
