"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BJJTechniqueGraph = () => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // Responsive width calculation
    const handleResize = () => {
      const containerWidth =
        window.innerWidth < 1024
          ? window.innerWidth * 0.95
          : Math.min(window.innerWidth * 0.7, 1200);
      const height = window.innerWidth < 768 ? 500 : 600;
      setDimensions({ width: containerWidth, height });
    };

    // Initial and resize listeners
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Technique data structure with more detailed descriptions
    const techniqueData = {
      nodes: [
        {
          id: "Start",
          group: 1,
          description: "Establish balanced stance with core engaged",
          icon: "🥋",
        },
        {
          id: "Grip",
          group: 2,
          description: "Secure collar tie or wrist control",
          icon: "✋",
        },
        {
          id: "Penetration",
          group: 3,
          description: "Explosive step with weight distribution",
          anatomy: "Quadriceps and Hamstring Tension",
          icon: "🦵",
        },
        {
          id: "Leverage",
          group: 4,
          description: "Control opponent's balance point",
          anatomy: "Knee and Ankle Joint Mechanics",
          icon: "💪",
        },
        {
          id: "Takedown",
          group: 5,
          description: "Execute precise takedown motion",
          icon: "🏆",
        },
        {
          id: "Control",
          group: 6,
          description: "Secure dominant position",
          anatomy: "Pelvis Pressure Control",
          icon: "🛡️",
        },
        {
          id: "Transition",
          group: 7,
          description: "Flow to secondary technique",
          anatomy: "Hip Torque Dynamics",
          icon: "↪️",
        },
      ],
      links: [
        { source: "Start", target: "Grip" },
        { source: "Grip", target: "Penetration" },
        { source: "Penetration", target: "Leverage" },
        { source: "Leverage", target: "Takedown" },
        { source: "Takedown", target: "Control" },
        { source: "Takedown", target: "Transition" },
      ],
    };

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Sophisticated color palette
    const color = d3.scaleOrdinal([
      "#3B82F6", // Vibrant Blue
      "#10B981", // Emerald Green
      "#8B5CF6", // Purple
      "#F43F5E", // Rose Red
      "#F59E0B", // Amber
      "#6366F1", // Indigo
      "#22D3EE", // Cyan
    ]);

    // Enhanced force simulation
    const simulation = d3
      .forceSimulation(techniqueData.nodes)
      .force(
        "link",
        d3
          .forceLink(techniqueData.links)
          .id((d) => d.id)
          .distance(width < 768 ? 100 : 150)
      )
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(40));

    // Create links with gradient
    const link = svg
      .append("g")
      .selectAll("line")
      .data(techniqueData.links)
      .enter()
      .append("line")
      .attr("stroke", "url(#linkGradient)")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 3);

    // Gradient for links
    const defs = svg.append("defs");
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "linkGradient")
      .attr("gradientUnits", "userSpaceOnUse");

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3B82F6");
    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#10B981");

    // Create nodes with more interactive design
    const node = svg
      .append("g")
      .selectAll("g")
      .data(techniqueData.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Larger, gradient-filled circles
    node
      .append("circle")
      .attr("r", 40)
      .attr("fill", (d) => `url(#nodeGradient-${d.group})`)
      .attr("stroke", (d) => color(d.group))
      .attr("stroke-width", 3);

    // Gradient definitions for nodes
    techniqueData.nodes.forEach((node) => {
      const nodeGradient = defs
        .append("radialGradient")
        .attr("id", `nodeGradient-${node.group}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "70%");

      nodeGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(node.group))
        .attr("stop-opacity", 0.7);

      nodeGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(node.group))
        .attr("stop-opacity", 0.3);
    });

    // Icon text inside nodes
    node
      .append("text")
      .text((d) => d.icon)
      .attr("font-size", 30)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "white");

    // Tooltip with more styling
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "linear-gradient(145deg, #3B82F6, #10B981)")
      .style("color", "white")
      .style("padding", "15px")
      .style("border-radius", "10px")
      .style("box-shadow", "0 4px 6px rgba(0,0,0,0.1)")
      .style("max-width", "250px")
      .style("opacity", 0)
      .style("transition", "opacity 0.3s");

    node
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `
        <strong style="font-size: 16px; color: white;">${d.id}</strong><br>
        <p style="margin-top: 5px; font-size: 14px;">${d.description}</p>
        ${
          d.anatomy
            ? `<em style="color: #F0F0F0;">Anatomy: ${d.anatomy}</em>`
            : ""
        }
      `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [dimensions]);

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
        BJJ Single Leg Takedown Technique Flow
      </h2>
      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} className="w-full max-w-full mx-auto" />
      </div>
    </div>
  );
};

export default BJJTechniqueGraph;
