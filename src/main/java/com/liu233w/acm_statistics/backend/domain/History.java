package com.liu233w.acm_statistics.backend.domain;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A History.
 */
@Entity
@Table(name = "history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "submission", nullable = false)
    private Integer submission;

    @NotNull
    @Column(name = "solved", nullable = false)
    private Integer solved;

    @NotNull
    @Lob
    @Column(name = "detail", nullable = false)
    private String detail;

    /**
     * 查询的详细记录，包含了每个爬虫的查询结果
     */
    @NotNull
    @ApiModelProperty(value = "查询的详细记录，包含了每个爬虫的查询结果", required = true)
    @Column(name = "query_time", nullable = false)
    private Instant queryTime;

    /**
     * 本次查询的时间
     */
    @NotNull
    @ApiModelProperty(value = "本次查询的时间", required = true)
    @Lob
    @Column(name = "usernames", nullable = false)
    private String usernames;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSubmission() {
        return submission;
    }

    public History submission(Integer submission) {
        this.submission = submission;
        return this;
    }

    public void setSubmission(Integer submission) {
        this.submission = submission;
    }

    public Integer getSolved() {
        return solved;
    }

    public History solved(Integer solved) {
        this.solved = solved;
        return this;
    }

    public void setSolved(Integer solved) {
        this.solved = solved;
    }

    public String getDetail() {
        return detail;
    }

    public History detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Instant getQueryTime() {
        return queryTime;
    }

    public History queryTime(Instant queryTime) {
        this.queryTime = queryTime;
        return this;
    }

    public void setQueryTime(Instant queryTime) {
        this.queryTime = queryTime;
    }

    public String getUsernames() {
        return usernames;
    }

    public History usernames(String usernames) {
        this.usernames = usernames;
        return this;
    }

    public void setUsernames(String usernames) {
        this.usernames = usernames;
    }

    public Long getUserId() {
        return userId;
    }

    public History userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        History history = (History) o;
        if (history.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), history.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "History{" +
            "id=" + getId() +
            ", submission=" + getSubmission() +
            ", solved=" + getSolved() +
            ", detail='" + getDetail() + "'" +
            ", queryTime='" + getQueryTime() + "'" +
            ", usernames='" + getUsernames() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
