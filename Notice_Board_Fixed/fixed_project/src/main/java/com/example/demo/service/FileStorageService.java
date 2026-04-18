package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file, String subFolder) throws Exception {

        String ext = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf("."));

        String filename = UUID.randomUUID() + ext;

        Path path = Paths.get(uploadDir, subFolder);
        Files.createDirectories(path);

        Path fullPath = path.resolve(filename);
        file.transferTo(fullPath);

        return fullPath.toString();
    }
}
