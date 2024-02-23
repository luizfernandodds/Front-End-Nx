package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class RouteDto implements Serializable {

	private static final long serialVersionUID = 5852119386038700972L;
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private LocalDateTime dateDreate;
	private String description;
	private String name;
	private String addressStart;
	private String addressEnd;
	private Integer radius;
	private String wkt;
	private String wktPoints;
	private Boolean routeAlternate = false;
	private String points;
	private String bounds;
	private Integer idExternalRoute;
	private String waypoint;
	private LocalDateTime dateDelete;
	private Integer routeType;

	public RouteDto() {
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RouteDto other = (RouteDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}