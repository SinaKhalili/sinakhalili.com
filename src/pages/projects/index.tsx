import { PopCitation } from "@/components/PopCitation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Text, Box, Heading, Image, VStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Projects() {
  return (
    <VStack spacing="20px">
      <Head>
        <title>Projects</title>
      </Head>
      <Heading>~ Projects ~</Heading>
      <Text>
        We do a little coding. We do a little art.
        <PopCitation>
          Unfortunately, I don&apos;t have a lot of time to do either of these
          things.
          <PopCitation>
            Also unfortunately, I&apos;m not very good at finishing either of
            these things
            <PopCitation>
              Finally, as always, the best shit is closed source
            </PopCitation>
          </PopCitation>
        </PopCitation>
      </Text>
      <Flex>
        <Link className="md-link" href="https://github.com/sinakhalili">
          my github
        </Link>
      </Flex>
      <Text>
        I hope you like my things and stuff as much as I like you being here 🤗
      </Text>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.name}
          description={project.description}
          repo={project.repo}
          website={project.website}
          imageSrc={project.imageSrc}
        />
      ))}
      <Flex>
        <Link className="md-link" href="https://github.com/sinakhalili">
          for everything I forgot that didn&apos;t make it here
        </Link>
      </Flex>
    </VStack>
  );
}
