import {
  Html,
  Head,
  Preview,
  Text,
  Heading,
  Body,
  Section,
  Container
} from "@react-email/components";
import * as React from "react";

interface BudgetAlertData {
  percentageUsed: Number;
  budgetAmount: string;
  totalExpenses: string;
  accountName: string;
}

interface EmailTemplateProps {
  userName?: string;
  type?: "budget-alert" | "monthly-report";
  data?: BudgetAlertData;
}

export default function EmailTemplate({
  userName = "",
  type = "budget-alert",
  data,
}: EmailTemplateProps) {
  if (type === "monthly-report") {
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {data?.percentageUsed.toFixed(1)}% of your monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>${data?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>${data?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  $
                  {(
                    parseFloat(data?.budgetAmount || "0") -
                    parseFloat(data?.totalExpenses || "0")
                  ).toFixed(2)}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },

  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 20px",
  },

  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: " 0 0 16px",
  },

  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },

  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },

  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
};
