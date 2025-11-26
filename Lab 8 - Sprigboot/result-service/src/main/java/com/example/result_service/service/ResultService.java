package com.example.result_service.service;

import com.example.result_service.dto.ResultRequest;
import com.example.result_service.dto.ResultResponse;
import com.example.result_service.model.ResultEntity;
import com.example.result_service.repository.ResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResultService {
    private final ResultRepository repo;

    public ResultService(ResultRepository repo) { this.repo = repo; }

    private double weighted(int mid, int end) {
        // both mid and end are out of 50
        return (mid / 50.0) * 30.0 + (end / 50.0) * 70.0; // result in 0..100
    }

    @Transactional
    public ResultResponse save(ResultRequest req) {
        double s1 = weighted(req.getSub1_mid(), req.getSub1_end());
        double s2 = weighted(req.getSub2_mid(), req.getSub2_end());
        double s3 = weighted(req.getSub3_mid(), req.getSub3_end());
        double s4 = weighted(req.getSub4_mid(), req.getSub4_end());

        double avg = (s1 + s2 + s3 + s4) / 4.0;
        double cgpa = avg / 10.0;

        ResultEntity entity = new ResultEntity();
        entity.setStudentName(req.getStudent_name());
        entity.setSub1Mid(req.getSub1_mid()); entity.setSub1End(req.getSub1_end());
        entity.setSub2Mid(req.getSub2_mid()); entity.setSub2End(req.getSub2_end());
        entity.setSub3Mid(req.getSub3_mid()); entity.setSub3End(req.getSub3_end());
        entity.setSub4Mid(req.getSub4_mid()); entity.setSub4End(req.getSub4_end());
        entity.setAvgPercentage(round2(avg));
        entity.setCgpa(round2(cgpa));

        ResultEntity saved = repo.save(entity);
        return new ResultResponse(saved.getId(), round2(s1), round2(s2), round2(s3), round2(s4), round2(avg), round2(cgpa));
    }

    private double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
