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
public class SmsDto implements Serializable {
	
	private static final long serialVersionUID = -2349307941516197198L;
	
	private Long id;
	private LoginDto login;
	private CustomerDto customer;
	private String modem;
	private Integer provider;
	private String phone;
	private String data;
	private Integer type;
	private Integer status;
	private String response;
	private LocalDateTime sent;
	private LocalDateTime date;

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
		SmsDto other = (SmsDto) obj;
		return Objects.equals(id, other.id);
	}

	
}