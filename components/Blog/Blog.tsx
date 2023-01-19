import React from "react";
import { SectionTitle, Text } from "@/utils/styled";
import {
  BlogInfoWrapper,
  BlogReadingTime,
  DocumentToc,
  DocumentTocHeading,
  DocumentTocItem,
  DocumentTocList,
  LeftSide,
  RightSide,
  Wrapper,
} from "./styled";
import AuthorComponent from "../AuthorComponent";
import { CardCategory } from "@/components/BlogPreviewCard/styled";

function Blog() {
  return (
    <Wrapper>
      <LeftSide>
        <CardCategory>#zxc</CardCategory>
        <SectionTitle>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
          pariatur?
        </SectionTitle>
        <BlogInfoWrapper>
          <AuthorComponent
            size="small"
            image="https://wallpaperaccess.com/full/2029165.jpg"
            name="zxc"
            subtitle="qwe"
          />
          <BlogReadingTime>Время чтения статьи: 5 минут</BlogReadingTime>
        </BlogInfoWrapper>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem
          blanditiis cumque debitis deleniti dolor eaque fuga in ipsa molestiae
          nobis numquam optio perspiciatis quas quis reprehenderit sequi
          similique, temporibus tenetur voluptatum. A dicta dolor dolores ea
          eligendi enim incidunt nihil totam. Accusamus alias, beatae doloremque
          et eveniet ipsa necessitatibus, numquam obcaecati perspiciatis sed
          vero vitae voluptatum. Consectetur exercitationem maiores, nesciunt
          nihil nobis non obcaecati officiis possimus praesentium qui quidem vel
          voluptatem, voluptates. Accusantium asperiores dolore ducimus enim eos
          hic illo, illum inventore itaque laudantium nostrum optio, pariatur
          perspiciatis quam quidem, sapiente voluptatum? Magnam minus possimus
          praesentium unde veniam. Aliquid eligendi, fuga id illo optio sit
          suscipit tenetur? Ad, amet beatae, cupiditate eius eum excepturi
          facilis, fugiat illum in nemo non odit pariatur placeat rem rerum
          sapiente ullam? Amet beatae deserunt dolore dolores ea error id ipsam
          ipsum iure, nostrum, omnis possimus quia quibusdam rerum sapiente.
          Accusantium culpa cumque ipsam ipsum maiores mollitia nobis recusandae
          voluptate? Ab accusamus at cumque eaque inventore iste, itaque
          laboriosam laudantium mollitia nam odit optio pariatur perspiciatis
          quae, quam quibusdam saepe sint soluta temporibus totam vel veritatis
          voluptatem! Aliquam consectetur, cum eveniet explicabo illo ipsam
          ipsum magnam nam officia omnis optio quae, quidem quisquam
          reprehenderit sequi sint sit vel voluptatem voluptatibus voluptatum.
          Adipisci aliquid amet autem ducimus eaque neque officiis ullam veniam
          voluptatem, voluptatibus. Adipisci alias aliquam aliquid atque
          blanditiis commodi corporis cum deleniti dignissimos dolor, dolorum ea
          earum esse facilis harum id illo incidunt inventore molestiae natus
          omnis placeat praesentium quae quaerat, qui rem sunt suscipit tempora
          tempore ut vel veniam vitae voluptatum? Architecto eum itaque modi
          omnis quia recusandae sapiente? Consequuntur dignissimos error
          expedita fugiat magni nostrum quae sit totam velit? Architecto
          doloremque fugiat iure, laudantium minus, nisi quae quam quia,
          repellat sunt ullam vel? Blanditiis cumque delectus excepturi labore
          maxime modi quasi quia quibusdam quod, sit, temporibus veritatis! Ad
          eos maiores officia quod sed. A adipisci aliquam aliquid beatae
          commodi consequatur corporis cum cumque, dignissimos distinctio dolore
          doloremque error esse eveniet explicabo facilis impedit inventore
          ipsam ipsum iure minus modi necessitatibus non numquam officiis,
          pariatur perspiciatis rem sit sunt suscipit tempore totam, ullam
          vitae. Delectus enim nisi nobis nulla possimus sequi veniam
          voluptates. Cupiditate fugiat in soluta voluptatibus! Ad aliquam
          assumenda consectetur cum cumque deleniti dolorum ducimus ex hic in
          incidunt iste laborum libero modi molestias nisi non obcaecati odit
          officiis pariatur perspiciatis qui quis repellendus, sit tempora
          tempore totam. Atque consequatur culpa eligendi error explicabo iste
          laboriosam magni necessitatibus perspiciatis, repellendus. Alias
          architecto atque aut autem beatae commodi consequuntur cupiditate
          deserunt distinctio doloremque dolores ducimus eligendi error
          excepturi explicabo facere facilis impedit labore laboriosam nemo non
          officia praesentium quidem quisquam, rerum sunt temporibus veniam! A
          debitis deleniti, dolor doloribus esse eum ex hic ipsa iste laboriosam
          maxime nisi, odit omnis pariatur qui rem repellat temporibus
          veritatis? Alias doloremque ducimus esse fugiat, itaque nulla officiis
          ratione repellendus veritatis vero! Aliquam dignissimos, eaque eos est
          id illum labore mollitia nam, nesciunt non optio possimus quae quasi
          quos, recusandae temporibus totam vero vitae voluptatum.
        </Text>
      </LeftSide>
      <RightSide>
        <DocumentToc>
          <DocumentTocHeading>
            <h2>In this article</h2>
          </DocumentTocHeading>
          <DocumentTocList>
            <DocumentTocItem $active>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>{" "}
            <DocumentTocItem>
              <a href="#интерактивный_пример">Интерактивный пример</a>
            </DocumentTocItem>
          </DocumentTocList>
        </DocumentToc>
      </RightSide>
    </Wrapper>
  );
}

export { Blog };
