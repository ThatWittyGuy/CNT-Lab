package com.example.result_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class ResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="student_name")
    private String studentName;

    @Column(name="sub1_mid") private Integer sub1Mid;
    @Column(name="sub1_end") private Integer sub1End;
    @Column(name="sub2_mid") private Integer sub2Mid;
    @Column(name="sub2_end") private Integer sub2End;
    @Column(name="sub3_mid") private Integer sub3Mid;
    @Column(name="sub3_end") private Integer sub3End;
    @Column(name="sub4_mid") private Integer sub4Mid;
    @Column(name="sub4_end") private Integer sub4End;

    @Column(name="avg_percentage") private Double avgPercentage;
    @Column(name="cgpa") private Double cgpa;

    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters (generate using IDE)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public Integer getSub1Mid() { return sub1Mid; }
    public void setSub1Mid(Integer sub1Mid) { this.sub1Mid = sub1Mid; }
    public Integer getSub1End() { return sub1End; }
    public void setSub1End(Integer sub1End) { this.sub1End = sub1End; }

    public Integer getSub2Mid() { return sub2Mid; }
    public void setSub2Mid(Integer sub2Mid) { this.sub2Mid = sub2Mid; }
    public Integer getSub2End() { return sub2End; }
    public void setSub2End(Integer sub2End) { this.sub2End = sub2End; }

    public Integer getSub3Mid() { return sub3Mid; }
    public void setSub3Mid(Integer sub3Mid) { this.sub3Mid = sub3Mid; }
    public Integer getSub3End() { return sub3End; }
    public void setSub3End(Integer sub3End) { this.sub3End = sub3End; }

    public Integer getSub4Mid() { return sub4Mid; }
    public void setSub4Mid(Integer sub4Mid) { this.sub4Mid = sub4Mid; }
    public Integer getSub4End() { return sub4End; }
    public void setSub4End(Integer sub4End) { this.sub4End = sub4End; }

    public Double getAvgPercentage() { return avgPercentage; }
    public void setAvgPercentage(Double avgPercentage) { this.avgPercentage = avgPercentage; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
