package com.liu233w.acm_statistics.backend.service;

import com.liu233w.acm_statistics.backend.service.dto.HistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing History.
 */
public interface HistoryService {

    /**
     * Save a history.
     *
     * @param historyDTO the entity to save
     * @return the persisted entity
     */
    HistoryDTO save(HistoryDTO historyDTO);

    /**
     * Get all the histories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<HistoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" history.
     *
     * @param id the id of the entity
     * @return the entity
     */
    HistoryDTO findOne(Long id);

    /**
     * Delete the "id" history.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
