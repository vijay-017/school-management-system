package com.backend.backend.dto;

public class MarksRequest {
    private String rollNumber;
    private Long subjectId;
    private Long examId;
    private Double marksObtained;
    private Double maxMarks; // optional — defaults to 100 if not provided

    public MarksRequest() {}

    public MarksRequest(String rollNumber, Long subjectId, Long examId,
                        Double marksObtained, Double maxMarks) {
        this.rollNumber = rollNumber;
        this.subjectId = subjectId;
        this.examId = examId;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks;
    }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Long getExamId() { return examId; }
    public void setExamId(Long examId) { this.examId = examId; }

    public Double getMarksObtained() { return marksObtained; }
    public void setMarksObtained(Double marksObtained) { this.marksObtained = marksObtained; }

    public Double getMaxMarks() { return maxMarks; }
    public void setMaxMarks(Double maxMarks) { this.maxMarks = maxMarks; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String rollNumber;
        private Long subjectId;
        private Long examId;
        private Double marksObtained;
        private Double maxMarks;

        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder subjectId(Long subjectId) { this.subjectId = subjectId; return this; }
        public Builder examId(Long examId) { this.examId = examId; return this; }
        public Builder marksObtained(Double marksObtained) { this.marksObtained = marksObtained; return this; }
        public Builder maxMarks(Double maxMarks) { this.maxMarks = maxMarks; return this; }

        public MarksRequest build() {
            return new MarksRequest(rollNumber, subjectId, examId, marksObtained, maxMarks);
        }
    }
}