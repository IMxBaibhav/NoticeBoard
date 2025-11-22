package com.example.demo.Entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Notice {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String title;
    @Column(length = 1000)
    private String message;
    private String PostedBy;
    private String date;
    


}
