import React from "react";
import { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb/ContentPage";
import { Layout } from "../components/Layout/Layout";
import { Container, Row } from "react-bootstrap";
import parse from "html-react-parser";
const ContentPage = ({ content, CategoryData }) => {
  const router = useRouter();

  return (
    <div>
      <Container fluid>
        <BreadcrumbUI content={content} activepath={router.query.index} />

        <Row>
          <Container>
            <div>{parse(content.page_content)}</div>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default ContentPage;
