package com.liu233w.acm_statistics.backend.repository;

import com.liu233w.acm_statistics.backend.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
