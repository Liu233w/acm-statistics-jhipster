package com.liu233w.acm_statistics.backend.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.liu233w.acm_statistics.backend.domain.enumeration.MailPeriod;

/**
 * A DTO for the CrawlerSubscription entity.
 */
public class CrawlerSubscriptionDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant createTime;

    @NotNull
    private MailPeriod period;

    private Long crawlerUsernameSetIdId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public MailPeriod getPeriod() {
        return period;
    }

    public void setPeriod(MailPeriod period) {
        this.period = period;
    }

    public Long getCrawlerUsernameSetIdId() {
        return crawlerUsernameSetIdId;
    }

    public void setCrawlerUsernameSetIdId(Long crawlerUsernameSetId) {
        this.crawlerUsernameSetIdId = crawlerUsernameSetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CrawlerSubscriptionDTO crawlerSubscriptionDTO = (CrawlerSubscriptionDTO) o;
        if(crawlerSubscriptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), crawlerSubscriptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CrawlerSubscriptionDTO{" +
            "id=" + getId() +
            ", createTime='" + getCreateTime() + "'" +
            ", period='" + getPeriod() + "'" +
            "}";
    }
}
