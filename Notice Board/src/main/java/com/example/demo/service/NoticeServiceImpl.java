package com.example.demo.service;
import com.example.demo.Entity.Notice;
import com.example.demo.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredargsConstructor

public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository repository;

    @Override 
    public createNotice(Notice notice){
        return repository.save(notice);
    }
@Override 
public List<Notice> getAllNotices(){
    return repository.findAll();

}
@Override
public Notice getNoticeById(Long Id){
    return repository.findBy(Id).orElse(Null);
}
@Override 
public void deleteNotice(Long Id){
    repository.deleteById(Id);
}
}
