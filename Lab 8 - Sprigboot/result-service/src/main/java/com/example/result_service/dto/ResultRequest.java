package com.example.result_service.dto;

public class ResultRequest {
    private String student_name;
    private Integer sub1_mid, sub1_end, sub2_mid, sub2_end, sub3_mid, sub3_end, sub4_mid, sub4_end;

    // getters and setters
    public String getStudent_name() { return student_name; }
    public void setStudent_name(String student_name) { this.student_name = student_name; }

    public Integer getSub1_mid() { return sub1_mid; }
    public void setSub1_mid(Integer sub1_mid) { this.sub1_mid = sub1_mid; }
    public Integer getSub1_end() { return sub1_end; }
    public void setSub1_end(Integer sub1_end) { this.sub1_end = sub1_end; }

    public Integer getSub2_mid() { return sub2_mid; }
    public void setSub2_mid(Integer sub2_mid) { this.sub2_mid = sub2_mid; }
    public Integer getSub2_end() { return sub2_end; }
    public void setSub2_end(Integer sub2_end) { this.sub2_end = sub2_end; }

    public Integer getSub3_mid() { return sub3_mid; }
    public void setSub3_mid(Integer sub3_mid) { this.sub3_mid = sub3_mid; }
    public Integer getSub3_end() { return sub3_end; }
    public void setSub3_end(Integer sub3_end) { this.sub3_end = sub3_end; }

    public Integer getSub4_mid() { return sub4_mid; }
    public void setSub4_mid(Integer sub4_mid) { this.sub4_mid = sub4_mid; }
    public Integer getSub4_end() { return sub4_end; }
    public void setSub4_end(Integer sub4_end) { this.sub4_end = sub4_end; }
}
