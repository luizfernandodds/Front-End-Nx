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
public class GroupControlDto implements Serializable {

	private static final long serialVersionUID = 5359936214079971299L;
	
	private Long id;
	private String name;
	private Integer type;
	private String description;
	private CustomerDto customer;
//	private Set<TargetDto> targets;
	private LocalDateTime dateCreate;
	private LoginDto login;

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
		GroupControlDto other = (GroupControlDto) obj;
		return Objects.equals(id, other.id);
	}

	
}