package com.example.result_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResultResponse {
    private Long id;

    @JsonProperty("sub1")
    private double sub1;
    @JsonProperty("sub2")
    private double sub2;
    @JsonProperty("sub3")
    private double sub3;
    @JsonProperty("sub4")
    private double sub4;

    @JsonProperty("avg_percentage")
    private double avg_percentage;

    private double cgpa;

    public ResultResponse() {}

    public ResultResponse(Long id, double sub1, double sub2, double sub3, double sub4, double avg_percentage, double cgpa) {
        this.id = id;
        this.sub1 = sub1;
        this.sub2 = sub2;
        this.sub3 = sub3;
        this.sub4 = sub4;
        this.avg_percentage = avg_percentage;
        this.cgpa = cgpa;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getSub1() { return sub1; }
    public void setSub1(double sub1) { this.sub1 = sub1; }

    public double getSub2() { return sub2; }
    public void setSub2(double sub2) { this.sub2 = sub2; }

    public double getSub3() { return sub3; }
    public void setSub3(double sub3) { this.sub3 = sub3; }

    public double getSub4() { return sub4; }
    public void setSub4(double sub4) { this.sub4 = sub4; }

    public double getAvg_percentage() { return avg_percentage; }
    public void setAvg_percentage(double avg_percentage) { this.avg_percentage = avg_percentage; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }
}
