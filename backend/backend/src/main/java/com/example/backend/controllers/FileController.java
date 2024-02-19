package com.example.backend.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:4200/")
public class FileController {

    @PostMapping("/uploadFile")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        if(file.getOriginalFilename().equals("avatar.png")) return "avatar.png"; 
        String currentWorkingDirectory = System.getProperty("user.dir");
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String uploadDir = "\\src\\main\\java\\com\\example\\backend\\other";;
            if(file.getContentType().equals("image/png") || file.getContentType().equals("image/jpg")) 
                uploadDir = "\\src\\main\\java\\com\\example\\backend\\userImages";
            else if(file.getContentType().equals("application/pdf"))
                uploadDir = "\\src\\main\\java\\com\\example\\backend\\CVs";
            String filePath = currentWorkingDirectory + uploadDir + File.separator + fileName;
            file.transferTo(new File(filePath));
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName) throws IOException {
        String currentWorkingDirectory = System.getProperty("user.dir");
        Path imagePath = Paths.get(currentWorkingDirectory + "/src/main/java/com/example/backend/userImages").resolve(fileName);
        Resource resource = new org.springframework.core.io.UrlResource(imagePath.toUri());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);
    }

    @PostMapping("/download")
    public ResponseEntity<byte[]> downloadPdf(@RequestBody String fileName) throws IOException {
        String currentWorkingDirectory = System.getProperty("user.dir");
        String path = currentWorkingDirectory + "/src/main/java/com/example/backend/CVs/"+ fileName;
        File file = new File(path);
        byte[] content = Files.readAllBytes(file.toPath());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", fileName);

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }
}
