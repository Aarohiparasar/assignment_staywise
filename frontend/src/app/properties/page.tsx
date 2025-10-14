"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PropertyAPI } from "@/lib/api";
import { Card, Row, Col, Select, Typography, Input, Skeleton, message } from "antd";
import { EnvironmentOutlined, DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("none");
  const [filterLocation, setFilterLocation] = useState<string>("");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await PropertyAPI.list();
        // simulate more data for scrollability
        const expanded = [...res.data, ...res.data, ...res.data];
        setProperties(expanded || []);
      } catch (err: any) {
        setError(err.message || "Failed to load properties");
        message.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  // Apply sorting and filtering
  const filteredAndSorted = useMemo(() => {
    let result = [...properties];

    if (filterLocation.trim()) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return result;
  }, [properties, sortOrder, filterLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Skeleton.Image active style={{ width: 300, height: 200 }} />
        <Skeleton active className="mt-4 w-96" />
        <p className="text-gray-600 mt-6">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Failed to load properties</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <Title level={2} className="!mb-0 text-center md:text-left">
            🏡 Explore Beautiful Properties
          </Title>

          <div className="flex flex-wrap items-center gap-3">
            <Input.Search
              placeholder="Filter by location..."
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-52"
              allowClear
            />
            <Select
              defaultValue="none"
              onChange={(v) => setSortOrder(v)}
              className="w-44"
            >
              <Option value="none">Sort by Price</Option>
              <Option value="low-high">Low → High</Option>
              <Option value="high-low">High → Low</Option>
            </Select>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <Text type="secondary" className="text-lg">
              No properties found. Try adjusting your filters.
            </Text>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredAndSorted.map((p: any) => (
              <Col key={p._id + Math.random()} xs={24} sm={12} lg={8}>
                <Link href={`/properties/${p._id}`}>
                  <Card
                    hoverable
                    cover={
                      <div className="relative h-56 w-full overflow-hidden">
                        {p.images?.length > 0 ? (
                          <Image
                            src={p.images[0]}
                            alt={p.title}
                            fill
                            unoptimized
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="bg-gray-200 h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    }
                    className="rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="space-y-2">
                      <Title level={4} className="!mb-1">
                        {p.title}
                      </Title>
                      <Text type="secondary" className="line-clamp-2 block">
                        {p.description}
                      </Text>
                      <div className="flex justify-between items-center pt-3">
                        <Text className="flex items-center gap-1 text-gray-600">
                          <EnvironmentOutlined /> {p.location}
                        </Text>
                        <Text strong style={{ color: "#1677ff" }} className="flex items-center gap-1">
                          <DollarOutlined /> {p.pricePerNight}/night
                        </Text>

                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
