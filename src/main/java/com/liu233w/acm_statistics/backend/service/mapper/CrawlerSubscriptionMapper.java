package com.liu233w.acm_statistics.backend.service.mapper;

import com.liu233w.acm_statistics.backend.domain.*;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerSubscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CrawlerSubscription and its DTO CrawlerSubscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {CrawlerUsernameSetMapper.class})
public interface CrawlerSubscriptionMapper extends EntityMapper<CrawlerSubscriptionDTO, CrawlerSubscription> {

    @Mapping(source = "crawlerUsernameSetId.id", target = "crawlerUsernameSetIdId")
    CrawlerSubscriptionDTO toDto(CrawlerSubscription crawlerSubscription);

    @Mapping(source = "crawlerUsernameSetIdId", target = "crawlerUsernameSetId")
    CrawlerSubscription toEntity(CrawlerSubscriptionDTO crawlerSubscriptionDTO);

    default CrawlerSubscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        CrawlerSubscription crawlerSubscription = new CrawlerSubscription();
        crawlerSubscription.setId(id);
        return crawlerSubscription;
    }
}
