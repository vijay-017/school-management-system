package com.backend.backend.dto;

import com.backend.backend.entity.DayOfWeekEnum;

public class TimeTableRequest {
    private Long classId;
    private DayOfWeekEnum day;
    private Integer periodNumber;
    private Long subjectId;
    private Long teacherId;

    public TimeTableRequest() {}

    public TimeTableRequest(Long classId, DayOfWeekEnum day, Integer periodNumber,
                            Long subjectId, Long teacherId) {
        this.classId = classId;
        this.day = day;
        this.periodNumber = periodNumber;
        this.subjectId = subjectId;
        this.teacherId = teacherId;
    }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public DayOfWeekEnum getDay() { return day; }
    public void setDay(DayOfWeekEnum day) { this.day = day; }

    public Integer getPeriodNumber() { return periodNumber; }
    public void setPeriodNumber(Integer periodNumber) { this.periodNumber = periodNumber; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long classId;
        private DayOfWeekEnum day;
        private Integer periodNumber;
        private Long subjectId;
        private Long teacherId;

        public Builder classId(Long classId) { this.classId = classId; return this; }
        public Builder day(DayOfWeekEnum day) { this.day = day; return this; }
        public Builder periodNumber(Integer periodNumber) { this.periodNumber = periodNumber; return this; }
        public Builder subjectId(Long subjectId) { this.subjectId = subjectId; return this; }
        public Builder teacherId(Long teacherId) { this.teacherId = teacherId; return this; }

        public TimeTableRequest build() {
            return new TimeTableRequest(classId, day, periodNumber, subjectId, teacherId);
        }
    }
}