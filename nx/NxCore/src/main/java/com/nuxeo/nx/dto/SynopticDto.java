package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SynopticDto implements Serializable  {
	
	private static final long serialVersionUID = 2108962694885780096L;
	private Long id;
	private CustomerDto customer;
	private String company;
	private String cnpj;
	private String riskManagementProgram;
	private String operation;
	private Double policyLimit;
	private LocalDateTime dateExp;
	private LocalDateTime dateCreate;
	private LocalDateTime dateUpdate;
	private LocalDateTime dateDelete;
	private LoginDto loginCreate;
	private LoginDto loginUpdate;
	private LoginDto loginDelete;
	private ProductDto product;
	
	public SynopticDto() {
		
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SynopticDto other = (SynopticDto) obj;
		return Objects.equals(id, other.id);
	}
	

}
